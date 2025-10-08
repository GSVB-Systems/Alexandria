using System.ComponentModel.DataAnnotations;
using api.DTOs;
using api.DTOs.Requests.Book;
using Microsoft.EntityFrameworkCore;
using scaffold;

namespace api.Service;

public class BookService(MyDbContext context) : IBookService
{
    public async Task<List<Book>> GetAllBooksAsync(GetBookRequestDto dto)
    {
        IQueryable<Book> query = context.Books
            .Include(a => a.Authors)
            .Include(g => g.Genre);

        // Filtering


        // Ordering
        if (dto.Ordering == BookOrderingOptions.Title)
            query = query.OrderBy(a => a.Title)
                .ThenBy(a => a.Authors.Count);
        else if (dto.Ordering == BookOrderingOptions.Pages)
            query = query.OrderBy(a => a.Pages)
                .ThenBy(a => a.Authors.Count);
        else if (dto.Ordering == BookOrderingOptions.Authors)
            query = query.OrderBy(a => a.Authors.Count)
                .ThenBy(a => a.Title);
        else if (dto.Ordering == BookOrderingOptions.Createdat)
            query = query.OrderBy(a => a.Createdat)
                .ThenBy(a => a.Authors.Count);

        // Chunking
        query = query.Skip(dto.skip).Take(dto.take);

        var list = await query.ToListAsync();

        return list;
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
        var book = context.Books.First(b => b.Id == dto.id);
        await context.Entry(book).Collection(b => b.Authors).LoadAsync();

        book.Pages = dto.pages;
        book.Title = dto.title;
        book.Genre = dto.genre != null ? context.Genres.First(g => g.Id == dto.genre) : null;
        book.Authors.Clear();
        dto.authors?.ForEach(id => book.Authors.Add(context.Authors.First(a => a.Id == id)));
        book.Imgurl = dto.imgurl;

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

    public async Task<List<BookDTO>> GetBookDtos()
    {
        return await context.Books
            .Include(a => a.Authors)
            .ThenInclude(b => b.Genres)
            .Select(a => new BookDTO(a))
            .ToListAsync();
    }
}

public record GetBookRequestDto
{
    [Range(0, int.MaxValue)]
    public int skip { get; set; }
    [Range(1, 100)]
    public int take { get; set; }
    public BookOrderingOptions Ordering { get; set; }
}

public enum BookOrderingOptions
{
    Title,
    Pages,
    Authors,
    Createdat,
}
