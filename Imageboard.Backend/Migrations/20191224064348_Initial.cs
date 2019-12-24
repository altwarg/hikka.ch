using System;

using Microsoft.EntityFrameworkCore.Migrations;

namespace Imageboard.Backend.Migrations {
    public partial class Initial : Migration {
        protected override void Up(MigrationBuilder migrationBuilder) {
            migrationBuilder.CreateTable(
                name: "Boards",
                columns : table => new {
                    Id = table.Column<Guid>(nullable: false),
                        Name = table.Column<string>(maxLength: 50, nullable: false),
                        Abbr = table.Column<string>(maxLength: 4, nullable: false)
                },
                constraints : table => {
                    table.PrimaryKey("PK_Boards", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Threads",
                columns : table => new {
                    Id = table.Column<Guid>(nullable: false),
                        Title = table.Column<string>(maxLength: 500, nullable: true),
                        Board = table.Column<Guid>(nullable: false),
                        Posts = table.Column<int>(nullable: false)
                },
                constraints : table => {
                    table.PrimaryKey("PK_Threads", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Threads_Boards",
                        column : x => x.Board,
                        principalTable: "Boards",
                        principalColumn: "Id",
                        onDelete : ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Posts",
                columns : table => new {
                    Id = table.Column<int>(nullable: false),
                        Thread = table.Column<Guid>(nullable: false),
                        No = table.Column<int>(nullable: false),
                        DateTime = table.Column<DateTime>(type: "datetime", nullable : false),
                        Message = table.Column<string>(nullable: true)
                },
                constraints : table => {
                    table.PrimaryKey("PK_Posts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Posts_Threads",
                        column : x => x.Thread,
                        principalTable: "Threads",
                        principalColumn: "Id",
                        onDelete : ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Posts_Thread",
                table: "Posts",
                column: "Thread");

            migrationBuilder.CreateIndex(
                name: "IX_Threads_Board",
                table: "Threads",
                column: "Board");
        }

        protected override void Down(MigrationBuilder migrationBuilder) {
            migrationBuilder.DropTable(
                name: "Posts");

            migrationBuilder.DropTable(
                name: "Threads");

            migrationBuilder.DropTable(
                name: "Boards");
        }
    }
}
