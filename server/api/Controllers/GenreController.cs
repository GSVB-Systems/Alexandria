using api.DTOs;
using api.DTOs.Requests;
using api.Service;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

public class GenreController(IGenreService genreService) : ControllerBase
{
    [HttpGet(nameof(GetAllGenres))]
    public async Task<List<GenreDTO>> GetAllGenres()
    {
        return await genreService.GetAllAsync();
    }

    [HttpPost(nameof(CreateGenre))]
    public async Task<GenreDTO> CreateGenre([FromBody] CreateGenreDTORequest genreDTO)
    {
        var result = await genreService.CreateAsync(genreDTO); 
        return result;
    }

    [HttpPut(nameof(UpdateGenre))]
    public async Task<GenreDTO> UpdateGenre([FromBody] UpdateGenreDTORequest genreDTO)
    {
        return await genreService.UpdateAsync(genreDTO);
    }

    [HttpDelete(nameof(DeleteGenre))]
    public async Task<GenreDTO> DeleteGenre(DeleteGenreDTORequest genreDTO)
    {
        return await genreService.DeleteAsync(genreDTO);
    }
    
    
}