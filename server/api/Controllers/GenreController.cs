using api.DTOs;
using api.DTOs.Requests;
using api.Service;
using api.Services;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

public class GenreController(ILibraryService libraryService) : ControllerBase
{
    [HttpGet(nameof(GetAllGenres))]
    public async Task<List<GenreDTO>> GetAllGenres()
    {
        return await libraryService.GetGenres();
    }

    [HttpPost(nameof(CreateGenre))]
    public async Task<GenreDTO> CreateGenre([FromBody] CreateGenreDTORequest genreDTO)
    {
        var result = await libraryService.CreateGenre(genreDTO); 
        return result;
    }

    [HttpPut(nameof(UpdateGenre))]
    public async Task<GenreDTO> UpdateGenre([FromBody] UpdateGenreDTORequest genreDTO)
    {
        return await libraryService.UpdateGenre(genreDTO);
    }

    [HttpDelete(nameof(DeleteGenre))]
    public async Task<GenreDTO> DeleteGenre(string genreDTO)
    {
        return await libraryService.DeleteGenre(genreDTO);
    }
    
    
}