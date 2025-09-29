using api.DTOs;
using api.DTOs.Requests.Book;
using Microsoft.EntityFrameworkCore;
using scaffold;

namespace api.Service;

public class BookService(MyDbContext context) : IBookService
{
    public async Task<List<BookDTO>> GetAllBooksAsync()
    {
        var books = await context.Books
            .Include(b => b.Genre)
            .Include(b => b.Authors)
            .ToListAsync();
    
        return books.Select(b => new BookDTO(b)).ToList();
    }

    
    public async Task<BookDTO> CreateBookAsync(CreateBookDTORequest dto)
    {
        if (dto.AuthorIds == null || !dto.AuthorIds.Any())
        {
            throw new ArgumentException("AuthorIds cannot be null or empty.");
        }
        
        var authors = await context.Authors
            .Where(a => dto.AuthorIds.Contains(a.Id))
            .ToListAsync();
        
        var book = new Book
        {
            Id = Guid.NewGuid().ToString(),
            Pages = dto.Pages,
            Title = dto.Title,
            Createdat = DateTime.UtcNow,
            Genreid = dto.Genreid,
            Imgurl = dto.Imgurl,
            Authors = authors
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
        book.Imgurl = dto.NewImgurl;
        
        await context.SaveChangesAsync();
        return new BookDTO(book);
    }

    public async Task<BookDTO> DeleteBookAsync(DeleteBookRequestDTO dto)
    {
        var existingBook = context.Books.First(b => b.Id == dto.Id); 
        context.Books.Remove(existingBook); 
        await context.SaveChangesAsync(); 
        return new BookDTO(existingBook);
    }
}