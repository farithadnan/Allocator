﻿// <auto-generated />
using System;
using Altr.Backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Altr.Backend.Migrations
{
    [DbContext(typeof(AppDbContext))]
    partial class AppDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.17")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Altr.Backend.Models.Category", b =>
                {
                    b.Property<int>("CategoryId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Code")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CreatedBy")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("DocumentId")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Remark")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("RunningNumber")
                        .HasColumnType("int");

                    b.Property<string>("UpdatedBy")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("UpdatedDate")
                        .HasColumnType("datetime2");

                    b.HasKey("CategoryId");

                    b.ToTable("Categories");
                });

            modelBuilder.Entity("Altr.Backend.Models.CategorySet", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("CategoryId")
                        .HasColumnType("int");

                    b.Property<string>("Code")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<decimal>("Percent")
                        .HasColumnType("decimal(18,2)");

                    b.Property<int>("TechniqueId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("CategoryId");

                    b.HasIndex("TechniqueId");

                    b.ToTable("CategorySet");
                });

            modelBuilder.Entity("Altr.Backend.Models.Expenditure", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("CategoryId")
                        .HasColumnType("int");

                    b.Property<string>("CreatedBy")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("PlanId")
                        .HasColumnType("int");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.Property<int?>("TechniqueId")
                        .HasColumnType("int");

                    b.Property<decimal>("TotalBalanceCategory")
                        .HasColumnType("decimal(18,2)");

                    b.Property<decimal>("TotalSpentCategory")
                        .HasColumnType("decimal(18,2)");

                    b.Property<string>("UpdatedBy")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("UpdatedDate")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.HasIndex("CategoryId");

                    b.HasIndex("PlanId");

                    b.HasIndex("TechniqueId");

                    b.ToTable("Expenditure");
                });

            modelBuilder.Entity("Altr.Backend.Models.ExpensesList", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("ExpenditureId")
                        .HasColumnType("int");

                    b.Property<string>("ExpensesName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<decimal>("TotalSpent")
                        .HasColumnType("decimal(18,2)");

                    b.HasKey("Id");

                    b.HasIndex("ExpenditureId");

                    b.ToTable("ExpensesList");
                });

            modelBuilder.Entity("Altr.Backend.Models.Plan", b =>
                {
                    b.Property<int>("PlanId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("DocumentId")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Remark")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("RunningNumber")
                        .HasColumnType("int");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.Property<int?>("TechniqueId")
                        .HasColumnType("int");

                    b.Property<decimal>("TotalAllBalance")
                        .HasColumnType("decimal(18,2)");

                    b.Property<decimal>("TotalAllMonthlyNetIncome")
                        .HasColumnType("decimal(18,2)");

                    b.HasKey("PlanId");

                    b.HasIndex("TechniqueId");

                    b.ToTable("Plans");
                });

            modelBuilder.Entity("Altr.Backend.Models.SourceIncome", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("PlanId")
                        .HasColumnType("int");

                    b.Property<string>("SourceName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<decimal>("TotalMonthlyNetIncome")
                        .HasColumnType("decimal(18,2)");

                    b.HasKey("Id");

                    b.HasIndex("PlanId");

                    b.ToTable("SourceIncome");
                });

            modelBuilder.Entity("Altr.Backend.Models.Technique", b =>
                {
                    b.Property<int>("TechniqueId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Code")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CreatedBy")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("DocumentId")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Remark")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("RunningNumber")
                        .HasColumnType("int");

                    b.Property<string>("UpdatedBy")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("UpdatedDate")
                        .HasColumnType("datetime2");

                    b.HasKey("TechniqueId");

                    b.ToTable("Techniques");
                });

            modelBuilder.Entity("Altr.Backend.Models.CategorySet", b =>
                {
                    b.HasOne("Altr.Backend.Models.Category", "Category")
                        .WithMany()
                        .HasForeignKey("CategoryId");

                    b.HasOne("Altr.Backend.Models.Technique", "Technique")
                        .WithMany("CategorySets")
                        .HasForeignKey("TechniqueId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Category");

                    b.Navigation("Technique");
                });

            modelBuilder.Entity("Altr.Backend.Models.Expenditure", b =>
                {
                    b.HasOne("Altr.Backend.Models.Category", "Category")
                        .WithMany()
                        .HasForeignKey("CategoryId");

                    b.HasOne("Altr.Backend.Models.Plan", "Plan")
                        .WithMany("Expenditures")
                        .HasForeignKey("PlanId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Altr.Backend.Models.Technique", "Technique")
                        .WithMany()
                        .HasForeignKey("TechniqueId");

                    b.Navigation("Category");

                    b.Navigation("Plan");

                    b.Navigation("Technique");
                });

            modelBuilder.Entity("Altr.Backend.Models.ExpensesList", b =>
                {
                    b.HasOne("Altr.Backend.Models.Expenditure", "Expenditure")
                        .WithMany("ExpensesLists")
                        .HasForeignKey("ExpenditureId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Expenditure");
                });

            modelBuilder.Entity("Altr.Backend.Models.Plan", b =>
                {
                    b.HasOne("Altr.Backend.Models.Technique", "Technique")
                        .WithMany()
                        .HasForeignKey("TechniqueId");

                    b.Navigation("Technique");
                });

            modelBuilder.Entity("Altr.Backend.Models.SourceIncome", b =>
                {
                    b.HasOne("Altr.Backend.Models.Plan", "Plan")
                        .WithMany("SourceIncomes")
                        .HasForeignKey("PlanId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Plan");
                });

            modelBuilder.Entity("Altr.Backend.Models.Expenditure", b =>
                {
                    b.Navigation("ExpensesLists");
                });

            modelBuilder.Entity("Altr.Backend.Models.Plan", b =>
                {
                    b.Navigation("Expenditures");

                    b.Navigation("SourceIncomes");
                });

            modelBuilder.Entity("Altr.Backend.Models.Technique", b =>
                {
                    b.Navigation("CategorySets");
                });
#pragma warning restore 612, 618
        }
    }
}