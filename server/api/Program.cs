using api;
using api.Etc;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using scaffold;

var builder = WebApplication.CreateBuilder(args);

var appOptions = builder.Services.AddAppOptions(builder.Configuration);


builder.Services.AddDbContext<MyDbContext>(conf =>
{
 conf.UseNpgsql(appOptions.DbConnectionString);
});

var app = builder.Build();

app.MapGet("/", ([FromServices] IOptionsMonitor<AppOptions> optionsMonitor, [FromServices] MyDbContext dbContext) =>
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
  return authors;
});

app.Run();
