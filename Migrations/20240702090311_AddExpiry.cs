using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MyProject_PMS_.Migrations
{
    /// <inheritdoc />
    public partial class AddExpiry : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "ExpiryDate",
                table: "Drugs",
                type: "datetime2",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ExpiryDate",
                table: "Drugs");
        }
    }
}
