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

builder.Services.AddControllers();
builder.Services.AddOpenApiDocument();

var app = builder.Build();


app.UseOpenApi();
app.UseSwaggerUi();
app.Run();
