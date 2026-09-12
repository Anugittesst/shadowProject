using Microsoft.AspNetCore.Mvc;
using ShadowProject.Data;
using ShadowProject.Interface;
using ShadowProject.Repo;
using System.Text.Json.Serialization;


var builder = WebApplication.CreateBuilder(args);

//Notes1 FOR CORS

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy => policy
            .WithOrigins("http://localhost:3000") // React app URL
            .AllowAnyHeader()
            .AllowAnyMethod());
});

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
//Notes2 This ensures you can access configuration (appsettings.json)
builder.Services.AddSingleton<IConfiguration>(builder.Configuration);
builder.Services.AddSingleton<DapperContext>();
builder.Services.AddScoped<ILogin, LoginRepo>();
builder.Services.AddScoped<IProgram, GetProgramRepo>();
builder.Services.AddScoped<IProject, ProjectRepo>();
builder.Services.AddScoped<IBulkUpload, BulkUploadRepo>();
builder.Services.AddScoped<ISearchAPI, SearchAPIRepo>();
builder.Services.AddScoped<IBulkDelete, BulkDeleteRepo>();

//IGNORE EMPTY FIELDS IN MODEL
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.DefaultIgnoreCondition =
            JsonIgnoreCondition.WhenWritingNull;
    });

//VERSIONING

builder.Services.AddApiVersioning(options =>
{
    options.DefaultApiVersion = new ApiVersion(1, 0);
    options.AssumeDefaultVersionWhenUnspecified = true;
    options.ReportApiVersions = true;
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();

app.MapControllers();
//Notes3 for cors
app.UseCors("AllowReactApp");

app.Run();
