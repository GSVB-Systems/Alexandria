using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using scaffold;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddDbContext<MyDbContext>(conf =>
{
 conf.UseNpgsql("Host=ep-calm-moon-agsgalrn-pooler.c-2.eu-central-1.aws.neon.tech; Database=neondb; Username=neondb_owner; Password=npg_FbPxLGuKqJ29; SSL Mode=VerifyFull; Channel Binding=Require;");
});

var app = builder.Build();

app.MapGet("/", ([FromServices] MyDbContext dbContext) =>
{  
    
    
    
    var myAuthor = new Author
    {
        Id = Guid.NewGuid().ToString(),
        Name = "John Doe",
        Createdat = DateTime.UtcNow
    };
    dbContext.Authors.Add(myAuthor);
    dbContext.SaveChanges();
    
  var authors = dbContext.Authors.ToList();
    var books = dbContext.Books.ToList();
    var genres = dbContext.Genres.ToList();
});

app.Run();
