using api.DTOs;
using api.DTOs.Requests;
using api.DTOs.Requests.Author;
using api.DTOs.Requests.Book;
using api.Services;
using Microsoft.AspNetCore.Mvc;

namespace api;

public class LibraryController(ILibraryService libraryService) : ControllerBase
{
    [HttpGet(nameof(GetAuthors))]
    public async Task<List<AuthorDTO>> GetAuthors()
    {
        return await libraryService.GetAuthors( );
    }
/*
    [HttpGet(nameof(GetAuthorDtos))]
    public async Task<List<AuthorDTO>> GetAuthorDtos()
    {
        return await libraryService.GetAuthorDtos();
    }
*/


    [HttpGet(nameof(GetBooks))]
    public async Task<List<BookDTO>> GetBooks()
    {
        return await libraryService.GetBooks();
    }

    [HttpGet(nameof(GetGenres))]
    public async Task<List<GenreDTO>> GetGenres()
    {
        return await libraryService.GetGenres();
    }

    [HttpPost(nameof(CreateBook))]
    public async Task<BookDTO> CreateBook([FromBody] CreateBookDTORequest dto)
    {
        return await libraryService.CreateBook(dto);
    }

    [HttpPut(nameof(UpdateBook))]
    public async Task<BookDTO> UpdateBook([FromBody] UpdateBookDTORequest dto)
    {
        return await libraryService.UpdateBook(dto);
    }

    [HttpDelete(nameof(DeleteBook))]
    public async Task<BookDTO> DeleteBook([FromQuery] string bookId)
    {
        return await libraryService.DeleteBook(bookId);
    }

    [HttpPost(nameof(CreateAuthor))]
    public async Task<AuthorDTO> CreateAuthor([FromBody] CreateAuthorRequestDto dto)
    {
        return await libraryService.CreateAuthor(dto);
    }

    [HttpPut(nameof(UpdateAuthor))]
    public async Task<AuthorDTO> UpdateAuthor([FromBody] UpdateAuthorRequestDto dto)
    {
        return await libraryService.UpdateAuthor(dto);
    }

    [HttpDelete(nameof(DeleteAuthor))]
    public async Task<AuthorDTO> DeleteAuthor([FromQuery] string authorId)
    {
        return await libraryService.DeleteAuthor(authorId);
    }

    [HttpPost(nameof(CreateGenre))]
    public async Task<GenreDTO> CreateGenre([FromBody] CreateGenreDTORequest dto)
    {
        return await libraryService.CreateGenre(dto);
    }

    [HttpDelete(nameof(DeleteGenre))]
    public async Task<GenreDTO> DeleteGenre([FromQuery] string genreId)
    {
        return await libraryService.DeleteGenre(genreId);
    }

    [HttpPut(nameof(UpdateGenre))]
    public async Task<GenreDTO> UpdateGenre([FromBody] UpdateGenreDTORequest dto)
    {
        return await libraryService.UpdateGenre(dto);
    }
    
    

}