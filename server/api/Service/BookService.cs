using api.DTOs;
using api.DTOs.Requests.Book;
using Microsoft.EntityFrameworkCore;
using scaffold;

namespace api.Service;

public class BookService(MyDbContext context) : IBookService
{
    public async Task<List<BookDTO>> GetAllBooksAsync()
    {
        return await context.Books.Select(b => new BookDTO(b)).ToListAsync();
    }

    public async Task<BookDTO> CreateBookAsync(CreateBookDTORequest dto)
    {
        var book = new Book
        {
            Pages = dto.Pages,
            Title = dto.Title,
            Createdat = DateTime.UtcNow,
            Id = Guid.NewGuid().ToString()
        };
        context.Books.Add(book);
        await context.SaveChangesAsync();
        return new BookDTO(book);
    }

    public async Task<BookDTO> UpdateBookAsync(UpdateBookDTORequest dto)
    {
        var book = context.Books.First(b => b.Id == dto.BookId);
        await context.Entry(book).Collection(b => b.Authors).LoadAsync();

        book.Pages = dto.NewPages;
        book.Title = dto.NewTitle;
        book.Genre = dto.GenreId != null ? context.Genres.First(g => g.Id == dto.GenreId) : null;
        book.Authors.Clear();
        dto.AuthorIds?.ForEach(id => book.Authors.Add(context.Authors.First(a => a.Id == id)));
        
        await context.SaveChangesAsync();
        return new BookDTO(book);
    }

    public async Task<BookDTO> DeleteBookAsync(DeleteBookRequestDTO dto)
    {
        var existingBook = context.Books.First(b => b.Title == dto.Title); 
        context.Books.Remove(existingBook); 
        await context.SaveChangesAsync(); 
        return new BookDTO(existingBook);
    }
}