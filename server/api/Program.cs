using System.Text.Json.Serialization;
using api;
using api.Etc;
using api.Service;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using scaffold;

var builder = WebApplication.CreateBuilder(args);

var appOptions = builder.Services.AddAppOptions(builder.Configuration);

builder.Services.AddScoped<IAuthorService, AuthorService>();
builder.Services.AddScoped<IGenreService, GenreService>();
builder.Services.AddScoped<IBookService, BookService>();
builder.Services.AddDbContext<MyDbContext>(conf =>
{
 conf.UseNpgsql(appOptions.DbConnectionString);
});


builder.Services.AddCors();
builder.Services.AddControllers().AddJsonOptions(options =>
{
 options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.Preserve;
});
builder.Services.AddOpenApiDocument();
builder.Services.AddProblemDetails();
builder.Services.AddExceptionHandler<GlobalExceptionHandler>();

var app = builder.Build();

app.UseExceptionHandler();

app.UseCors(config => config
 .AllowAnyHeader()
 .AllowAnyMethod()
 .AllowAnyOrigin()
 .SetIsOriginAllowed(x => true)
 );

app.MapControllers();


app.UseOpenApi();
app.UseSwaggerUi();
app.Run();
