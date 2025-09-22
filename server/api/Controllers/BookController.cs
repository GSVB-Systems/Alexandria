using api.DTOs;
using api.DTOs.Requests.Book;
using api.Service;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

public class BookController(IBookService bookService) : ControllerBase
{
    [HttpGet(nameof(GetBooks))]
    public async Task<List<BookDTO>> GetBooks()
    {
        return await bookService.GetAllBooksAsync();
    }

    [HttpPost(nameof(CreateBook))]
    public async Task<BookDTO> CreateBook([FromBody] CreateBookDTORequest bookDTO)
    {
        return await bookService.CreateBookAsync(bookDTO);
    }

    [HttpPut(nameof(UpdateBook))]
    public async Task<BookDTO> UpdateBook([FromBody] UpdateBookDTORequest bookDTO)
    {
        return await bookService.UpdateBookAsync(bookDTO);
    }

    [HttpDelete(nameof(DeleteBook))]
    public async Task<BookDTO> DeleteBook([FromQuery] DeleteBookRequestDTO dto)
    {
        return await bookService.DeleteBookAsync(dto);
    }
}