using Microsoft.EntityFrameworkCore;

namespace Altr.Backend.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {}

        public DbSet<Category> Categories {get;set;}
        public DbSet<Plan> Plans {get;set;}
        public DbSet<Technique> Techniques {get;set;}
    
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            
        }
    
    }
}
