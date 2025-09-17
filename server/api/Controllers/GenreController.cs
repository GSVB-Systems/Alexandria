using api.DTOs;
using api.DTOs.Requests;
using api.Services;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

public class GenreController(IGenreService genreService) : ControllerBase
{
    [HttpGet(nameof(GetGenres))]
    public async Task<List<GenreDTO>> GetGenres()
    {
        return await genreService.GetAllAsync();
    }

    [HttpPost(nameof(CreateGenre))]
    public async Task<GenreDTO> CreateGenre([FromBody] CreateGenreDTORequest genreDTO)
    {
        return await genreService.CreateAsync(genreDTO);
    }

    [HttpPut(nameof(UpdateGenre))]
    public async Task<GenreDTO> UpdateGenre([FromBody] UpdateGenreDTORequest genreDTO)
    {
        return await genreService.UpdateAsync(genreDTO);
    }

    [HttpDelete(nameof(DeleteGenre))]
    public async Task<GenreDTO> DeleteGenre(string id)
    {
        return await genreService.DeleteAsync(id);
    }
    
    
}