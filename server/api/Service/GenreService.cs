using api.DTOs;
using api.DTOs.Requests;
using api.Service;
using Microsoft.EntityFrameworkCore;
using scaffold;

namespace api.Service;

public class GenreService(MyDbContext context) : IGenreService
{

    public async Task<List<GenreDTO>> GetAllAsync()
    {
        return await context.Genres.Select(g => new GenreDTO(g)).ToListAsync();
    }

    public async Task<GenreDTO> CreateAsync(CreateGenreDTORequest dtoRequest)
    {
        var genre = new Genre
        {
            Id = Guid.NewGuid().ToString(),
            Name = dtoRequest.Name,
            Createdat = DateTime.Now
        };
        context.Genres.Add(genre);
        await context.SaveChangesAsync();
        return new GenreDTO(genre);
        
    }

    public async Task<GenreDTO?> UpdateAsync(UpdateGenreDTORequest dtoRequest)
    {
        var genre = context.Genres.First(g => g.Id == dtoRequest.LookingForId);
        genre.Name = dtoRequest.NewGenreName;
        await context.SaveChangesAsync();
        return new GenreDTO(genre);
    }

    public async Task<GenreDTO> DeleteAsync(string id)
    {
        var genre = context.Genres.First(g => g.Id == id);
        context.Genres.Remove(genre);
        await context.SaveChangesAsync();
        return new GenreDTO(genre);
    }
    
}