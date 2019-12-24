using System;

using Imageboard.Backend.Models;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Imageboard.Backend.Migrations {
    [DbContext(typeof(ImageboardContext))]
    partial class ImageboardContextModelSnapshot : ModelSnapshot {
        protected override void BuildModel(ModelBuilder modelBuilder) {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Imageboard.Backend.Models.Boards", b => {
                b.Property<Guid>("Id")
                    .HasColumnType("uniqueidentifier");

                b.Property<string>("Abbr")
                    .IsRequired()
                    .HasColumnType("nvarchar(4)")
                    .HasMaxLength(4);

                b.Property<string>("Name")
                    .IsRequired()
                    .HasColumnType("nvarchar(50)")
                    .HasMaxLength(50);

                b.HasKey("Id");

                b.ToTable("Boards");
            });

            modelBuilder.Entity("Imageboard.Backend.Models.Posts", b => {
                b.Property<int>("Id")
                    .HasColumnType("int");

                b.Property<DateTime>("DateTime")
                    .HasColumnType("datetime");

                b.Property<string>("Message")
                    .HasColumnType("nvarchar(max)");

                b.Property<int>("No")
                    .HasColumnType("int");

                b.Property<Guid>("Thread")
                    .HasColumnType("uniqueidentifier");

                b.HasKey("Id");

                b.HasIndex("Thread");

                b.ToTable("Posts");
            });

            modelBuilder.Entity("Imageboard.Backend.Models.Threads", b => {
                b.Property<Guid>("Id")
                    .HasColumnType("uniqueidentifier");

                b.Property<Guid>("Board")
                    .HasColumnType("uniqueidentifier");

                b.Property<int>("Posts")
                    .HasColumnType("int");

                b.Property<string>("Title")
                    .HasColumnType("nvarchar(500)")
                    .HasMaxLength(500);

                b.HasKey("Id");

                b.HasIndex("Board");

                b.ToTable("Threads");
            });

            modelBuilder.Entity("Imageboard.Backend.Models.Posts", b => {
                b.HasOne("Imageboard.Backend.Models.Threads", "ThreadNavigation")
                    .WithMany("PostsNavigation")
                    .HasForeignKey("Thread")
                    .HasConstraintName("FK_Posts_Threads")
                    .IsRequired();
            });

            modelBuilder.Entity("Imageboard.Backend.Models.Threads", b => {
                b.HasOne("Imageboard.Backend.Models.Boards", "BoardNavigation")
                    .WithMany("Threads")
                    .HasForeignKey("Board")
                    .HasConstraintName("FK_Threads_Boards")
                    .IsRequired();
            });
#pragma warning restore 612, 618
        }
    }
}
