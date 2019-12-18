using System;

using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Imageboard.Backend.Models {
    public partial class ImageboardContext : DbContext {
        public ImageboardContext() { }

        public ImageboardContext(DbContextOptions<ImageboardContext> options) : base(options) { }

        public virtual DbSet<Boards> Boards { get; set; }
        public virtual DbSet<Posts> Posts { get; set; }
        public virtual DbSet<Threads> Threads { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {
            if (!optionsBuilder.IsConfigured) {
                IConfigurationRoot config = new ConfigurationBuilder()
                    .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
                    .AddJsonFile("appsettings.json")
                    .Build();

                optionsBuilder.UseSqlServer(config.GetConnectionString("DB"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            modelBuilder.Entity<Boards>(entity => {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Abbr)
                    .IsRequired()
                    .HasMaxLength(4);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<Posts>(entity => {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.DateTime).HasColumnType("datetime");

                entity.HasOne(d => d.ThreadNavigation)
                    .WithMany(p => p.PostsNavigation)
                    .HasForeignKey(d => d.Thread)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Posts_Threads");
            });

            modelBuilder.Entity<Threads>(entity => {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Title).HasMaxLength(500);

                entity.HasOne(d => d.BoardNavigation)
                    .WithMany(p => p.Threads)
                    .HasForeignKey(d => d.Board)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Threads_Boards");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
