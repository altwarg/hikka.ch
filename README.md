# hikka.ch
hikka.ch is an imageboard with .NET 5 backend and React-Typescript frontend. Inspired by [Hikkaba](https://github.com/magicxor/Hikkaba)

For an imageboard I've used:
- ASP.NET Core 5 for backend and interaction with the database
- React with Typescript for frontend:
    * Next.js for SSR
    * PrimeReact as components library
- MongoDB GridFS for storage

# Features
- [ ] Posts attachments: [in progress: audio/video]
    * Audio
    * Video
    * Pictures
- [ ] Attachments preview: [in progress: audio/video]
    * Pictures (png, jpeg, bmp and maybe some other formats)
    * Video (mp4, webm)
    * Audio (mp3, flac)
- [ ] Thumbnail generation
- [x] BBCode markup support: `[b], [i], [u], [s], [code], [spoiler], >>, >`
- [x] SAGE support
- [ ] Captcha
- [ ] Search
- [x] API [still there're can be some breaking changes]
- [ ] Docker-image
