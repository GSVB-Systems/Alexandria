using api.DTOs;
using api.DTOs.Requests.Book;
using api.Service;
using Microsoft.AspNetCore.Mvc;
using scaffold;

namespace api.Controllers;

public class BookController(IBookService bookService) : ControllerBase
{
    [HttpPost(nameof(GetAllBooks))]
    public async Task<List<Book>> GetAllBooks([FromBody]GetBookRequestDto dto)
    {
        return await bookService.GetAllBooksAsync(dto);
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