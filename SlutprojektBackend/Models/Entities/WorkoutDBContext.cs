using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace SlutprojektBackend.Models.Entities
{
    public partial class WorkoutDBContext : DbContext
    {
        public virtual DbSet<Exercise> Exercise { get; set; }
        public virtual DbSet<Goal> Goal { get; set; }
        public virtual DbSet<Set> Set { get; set; }
        public virtual DbSet<UserFavorites> UserFavorites { get; set; }
        public virtual DbSet<UserSettings> UserSettings { get; set; }
        public virtual DbSet<UserWeight> UserWeight { get; set; }
        public virtual DbSet<WorkoutSession> WorkoutSession { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer(@"Data Source=(localdb)\MSSQLLocalDB;Initial Catalog=SlutprojektLokalDB;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=True;ApplicationIntent=ReadWrite;MultiSubnetFailover=False");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Exercise>(entity =>
            {
                entity.ToTable("Exercise", "logit");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.ExerciseName)
                    .IsRequired()
                    .HasMaxLength(20);

                entity.Property(e => e.WorkoutSessionId).HasColumnName("WorkoutSessionID");

                entity.HasOne(d => d.WorkoutSession)
                    .WithMany(p => p.Exercise)
                    .HasForeignKey(d => d.WorkoutSessionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Exercise__Workou__619B8048");
            });

            modelBuilder.Entity<Goal>(entity =>
            {
                entity.ToTable("Goal", "logit");

                entity.Property(e => e.Type)
                    .IsRequired()
                    .HasMaxLength(20);

                entity.Property(e => e.UserId)
                    .IsRequired()
                    .HasColumnName("UserID")
                    .HasMaxLength(450);
            });

            modelBuilder.Entity<Set>(entity =>
            {
                entity.ToTable("Set", "logit");

                entity.Property(e => e.ExerciseId).HasColumnName("ExerciseID");

                entity.Property(e => e.UserNote)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.HasOne(d => d.Exercise)
                    .WithMany(p => p.Set)
                    .HasForeignKey(d => d.ExerciseId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Set__ExerciseID__60A75C0F");
            });

            modelBuilder.Entity<UserFavorites>(entity =>
            {
                entity.ToTable("UserFavorites", "logit");

                entity.Property(e => e.Favorite)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.UserId)
                    .IsRequired()
                    .HasColumnName("UserID")
                    .HasMaxLength(450);
            });

            modelBuilder.Entity<UserSettings>(entity =>
            {
                entity.ToTable("UserSettings", "logit");

                entity.Property(e => e.Gender)
                    .IsRequired()
                    .HasMaxLength(10);

                entity.Property(e => e.UserId)
                    .IsRequired()
                    .HasColumnName("UserID")
                    .HasMaxLength(450);
            });

            modelBuilder.Entity<UserWeight>(entity =>
            {
                entity.ToTable("UserWeight", "logit");

                entity.Property(e => e.Date).HasColumnType("datetime");

                entity.Property(e => e.UserId)
                    .IsRequired()
                    .HasColumnName("UserID")
                    .HasMaxLength(450);

                entity.Property(e => e.UserWeight1).HasColumnName("UserWeight");
            });

            modelBuilder.Entity<WorkoutSession>(entity =>
            {
                entity.ToTable("WorkoutSession", "logit");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Date).HasColumnType("datetime");

                entity.Property(e => e.SessionName).HasMaxLength(50);

                entity.Property(e => e.SessionUserNote).HasMaxLength(50);

                entity.Property(e => e.Type).HasMaxLength(50);

                entity.Property(e => e.UserId)
                    .IsRequired()
                    .HasColumnName("UserID")
                    .HasMaxLength(450);
            });
        }
    }
}
