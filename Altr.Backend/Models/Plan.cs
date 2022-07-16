using Altr.Backend.Models.Foundation;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Altr.Backend.Models
{
    public class Plan : DocumentEntity
    {
        public Plan()
        {
            Expenditures = new List<Expenditure>();
            SourceIncomes = new List<SourceIncome>();
        }

        public string Name { get; set; }
        public string Description { get; set; }
        public int? TechniqueId { get; set; }
        public virtual Technique Technique { get; set; }
        public virtual List<Expenditure> Expenditures { get; set; }
        public virtual List<SourceIncome> SourceIncomes { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal TotalAllMonthlyNetIncome { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal TotalAllBalance { get; set; }
        public ExpendStatus Status { get; set; }
    }

    public class Expenditure : BaseEntity
    {
        public Expenditure()
        {
            ExpensesLists = new List<ExpensesList>();
        }

        public int PlanId { get; set; }
        public virtual Plan Plan { get; set; }
        public int? TechniqueId { get; set; }
        public virtual Technique Technique { get; set; }
        public int? CategoryId { get; set; }
        public virtual Category Category { get; set; }

        public virtual List <ExpensesList> ExpensesLists { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal TotalSpentCategory { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal TotalBalanceCategory { get; set; }

        public ExpendStatus Status { get; set; }

        public string CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }

    }

    public class SourceIncome : BaseEntity
    {
        public int PlanId { get; set; }
        public virtual Plan Plan { get; set; }
        public string SourceName { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal TotalMonthlyNetIncome { get; set; }
    }

    public class ExpensesList : BaseEntity
    {
        public int ExpenditureId { get; set; }
        public virtual Expenditure Expenditure { get; set; }
        public string ExpensesName { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal TotalSpent { get; set; }

    }

    public enum ExpendStatus
    {
        [Display(Name = "Normal")]
        Normal,
        [Display(Name = "Overspent")]
        Overspent,
    }
}
