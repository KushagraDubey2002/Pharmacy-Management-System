using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MyProject_PMS_.Migrations
{
    /// <inheritdoc />
    public partial class ExpiryNonNULL : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "ExpiryDate",
                table: "Drugs",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2025,1,1).Add(DateTime.Now.TimeOfDay),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldNullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "ExpiryDate",
                table: "Drugs",
                type: "datetime2",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");
        }
    }
}
