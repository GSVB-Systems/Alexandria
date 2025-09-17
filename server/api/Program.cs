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


builder.Services.AddCors();
builder.Services.AddControllers();
builder.Services.AddOpenApiDocument();

var app = builder.Build();

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
