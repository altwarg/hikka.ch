using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

using Imageboard.Backend.Data.DTO;
using Imageboard.Backend.Data.Repository;
using Imageboard.Backend.Models;

using Microsoft.Extensions.Options;

using MongoDB.Bson;
using MongoDB.Driver;

namespace Imageboard.Backend.Services {
    public class ThreadsService {
        private readonly ThreadsRepository threadsRepository = null;
        private readonly BoardsRepository boardsRepository = null;

        public ThreadsService(IOptions<Settings> settings) {
            this.threadsRepository = new ThreadsRepository(settings);
            this.boardsRepository = new BoardsRepository(settings);
        }

        public async Task<List<Thread>> GetThreads(string board) {
            return await this.threadsRepository.GetThreadsAsync(board);
        }

        public async Task<List<Thread>> GetThreads(string board, int lastPostsLimit) {
            if (await this.boardsRepository.BoardExistsAsync(board)) {
                var threads = await this.threadsRepository.GetThreadsAsync(board);
                foreach (var thread in threads) {
                    var opPost = thread.Posts[0];
                    var posts = thread.Posts.TakeLast(lastPostsLimit).ToList();

                    if (!posts.Contains(opPost)) {
                        posts.Insert(0, opPost);
                    }

                    thread.Posts = posts;
                }

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

            var post = new Post() {
                Id = id.ToString(),
                No = 1,
                Name = !string.IsNullOrEmpty(data.Name) ? data.Name : null,
                DateTime = DateTime.Now.ToString("dd/MM/yyyy ddd HH:mm:ss"),
                Message = data.Message
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

            var post = new Post() {
                Id = id.ToString(),
                No = no,
                Name = null,
                DateTime = DateTime.Now.ToString("dd/MM/yyyy ddd HH:mm:ss"),
                Message = data.Message
            };

            if (await this.threadsRepository.AddPostAsync(data.Thread, post)) {
                return await this.threadsRepository.GetThreadAsync(data.Thread);
            }

            return null;
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
