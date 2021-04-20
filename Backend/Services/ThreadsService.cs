using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

using Imageboard.Data.DTO;
using Imageboard.Data.Repository;
using Imageboard.Models;

using Microsoft.Extensions.Configuration;

using MongoDB.Bson;
using MongoDB.Driver;

namespace Imageboard.Services {
    public class ThreadsService {
        private readonly ThreadsRepository threadsRepository = null;
        private readonly BoardsRepository boardsRepository = null;

        public ThreadsService(IConfiguration configuration) {
            this.threadsRepository = new ThreadsRepository(configuration);
            this.boardsRepository = new BoardsRepository(configuration);
        }

        public async Task<List<Thread>> GetThreads(string board) {
            return await this.threadsRepository.GetThreadsAsync(board);
        }

        public async Task<List<Thread>> GetThreads(string board, int lastPostsLimit) {
            if (await this.boardsRepository.BoardExistsAsync(board)) {
                var threads = await this.threadsRepository.GetThreadsAsync(board);

                // Last 3 posts with op-post
                foreach (var thread in threads) {
                    var opPost = thread.Posts[0];
                    var posts = thread.Posts.TakeLast(lastPostsLimit).ToList();

                    if (!posts.Contains(opPost)) {
                        posts.Insert(0, opPost);
                    }

                    thread.Posts = posts;
                }

                // Sorting by last post datetime (descending)
                threads.Sort((x, y) => {
                    if (x.Posts.Last().Sage || y.Posts.Last().Sage) {
                        return 1;
                    } else {
                        return -1 * DateTime.Compare(x.Posts.Last().Created, y.Posts.Last().Created);
                    }
                });

                return threads;
            }

            return null;
        }

        public async Task<Thread> GetThread(string id) {
            return await this.threadsRepository.GetThreadAsync(id);
        }

        public async Task<List<Thread>> GetAllThreads() {
            return await this.threadsRepository.GetThreadsAsync();
        }

        public async Task<Thread> CreateThread(NewThreadDTO data) {
            data.Message = await this.FormatMentions(data.Message);

            var id = await this.threadsRepository.GetNextSequenceValueAsync("postId");
            var attachmentId = await this.threadsRepository.AddAttachmentAsync(data.Attachment);

            var post = new Post() {
                Id = id.ToString(),
                No = 1,
                Name = !string.IsNullOrEmpty(data.Name) ? data.Name : null,
                Created = DateTime.Now,
                Message = data.Message,
                Attachment = attachmentId
            };

            var thread = new Thread() {
                Id = ObjectId.GenerateNewId().ToString(),
                Board = data.Board,
                Title = data.Title,
                PostsCount = 1,
                Posts = new List<Post>() { post }
            };

            await this.threadsRepository.AddThreadAsync(thread);
            return thread;
        }

        public async Task<Thread> CreatePost(NewPostDTO data) {
            data.Message = await this.FormatMentions(data.Message);

            var thread = await this.threadsRepository.GetThreadAsync(data.Thread);
            var no = thread.Posts.Last().No + 1;
            var id = await this.threadsRepository.GetNextSequenceValueAsync("postId");
            string attachmentId = string.Empty;
            if (data.Attachment != null) {
                attachmentId = await this.threadsRepository.AddAttachmentAsync(data.Attachment);
            }

            var post = new Post() {
                Id = id.ToString(),
                No = no,
                Name = null,
                Created = DateTime.Now,
                Message = data.Message,
                Attachment = attachmentId,
                Sage = data.Sage == "sage"
            };

            if (await this.threadsRepository.AddPostAsync(data.Thread, post)) {
                return await this.threadsRepository.GetThreadAsync(data.Thread);
            }

            return null;
        }

        public async Task<Attachment> GetAttachment(string id) {
            var attachment = await this.threadsRepository.GetAttachmentAsync(id);
            attachment.Stream.Position = 0;
            return attachment;
        }

        private async Task<string> FormatMentions(string message) {
            var formatted = message;

            if (message.Contains(">>")) {
                foreach (Match match in Regex.Matches(message, @"\B>>(\d+)\b", RegexOptions.Multiline)) {
                    foreach (var inspectedThread in await GetAllThreads()) {
                        var id = match.Groups[1].Value;

                        var inspectedPost = inspectedThread.Posts.Find(item => item.Id == id);
                        if (inspectedPost == null) {
                            continue;
                        }

                        formatted = formatted.Replace($">>{id}", $">>{id}#/{inspectedThread.Board}/{inspectedThread.Id}");
                    }
                }
            }

            return formatted;
        }
    }
}
