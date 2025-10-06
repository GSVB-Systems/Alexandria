using api.DTOs;
using api.DTOs.Requests.Book;
using api.Service;
using api.Services;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

public class BookController(ILibraryService libraryService) : ControllerBase
{
    [HttpGet(nameof(GetAllBooks))]
    public async Task<List<BookDTO>> GetAllBooks()
    {
        return await libraryService.GetBooks();
    }

    [HttpPost(nameof(CreateBook))]
    public async Task<BookDTO> CreateBook([FromBody] CreateBookDTORequest bookDTO)
    {
        return await libraryService.CreateBook(bookDTO);
    }

    [HttpPut(nameof(UpdateBook))]
    public async Task<BookDTO> UpdateBook([FromBody] UpdateBookDTORequest bookDTO)
    {
        return await libraryService.UpdateBook(bookDTO);
    }

    [HttpDelete(nameof(DeleteBook))]
    public async Task<BookDTO> DeleteBook([FromQuery] string dto)
    {
        return await libraryService.DeleteBook(dto);
    }
}