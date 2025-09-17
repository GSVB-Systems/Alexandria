using api.DTOs;
using api.DTOs.Requests;

namespace api.Services;

public interface IGenreService
{

    Task<List<GenreDTO>> GetAllAsync();
    Task<GenreDTO> CreateAsync(CreateGenreDTORequest dtoRequest);
    Task<GenreDTO?> UpdateAsync(UpdateGenreDTORequest dtoRequest);
    Task<GenreDTO> DeleteAsync(string id);
}