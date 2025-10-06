using System.ComponentModel.DataAnnotations;
using api.DTOs;
using api.DTOs.Requests;
using api.DTOs.Requests.Author;
using api.DTOs.Requests.Book;
using Microsoft.EntityFrameworkCore;
using scaffold;

namespace api.Services;

public class LibraryService(MyDbContext ctx) : ILibraryService
{
    public Task<List<AuthorDTO>> GetAuthors()
    {
        return ctx.Authors
            .Include(a => a.Books)
            .ThenInclude(b => b.Genre)
            .ToListAsync();
    }

    public Task<List<BookDTO>> GetBooks(int skip, int take)
    {
        return ctx.Books
            .Include(b => b.Genre)
            .Include(b => b.Authors)
            .Skip(skip)
            .Take(take)
            //.Select(a => new AuthorDTO(a))
            .Select(b => new BookDTO(b)).ToListAsync();
    }

    public Task<List<GenreDTO>> GetGenres()
    {
        return ctx.Genres
            .Include(g => g.Books)
            .Select(g => new GenreDTO(g)).ToListAsync();
    }

    public async Task<BookDTO> CreateBook(CreateBookDTORequest dto)
    {
        Validator.ValidateObject(dto, new ValidationContext(dto), true);

        var book = new Book
        {
            Pages = dto.Pages,
            Createdat = DateTime.UtcNow,
            Id = Guid.NewGuid().ToString(),
            Title = dto.Title
        };
        ctx.Books.Add(book);
        await ctx.SaveChangesAsync();
        return new BookDTO(book);
    }

    public async Task<BookDTO> UpdateBook(UpdateBookDTORequest dto)
    {
        Validator.ValidateObject(dto, new ValidationContext(dto), true);
        var book = ctx.Books.First(b => b.Id == dto.id);
        await ctx.Entry(book).Collection(b => b.Authors).LoadAsync();

        book.Pages = dto.pages;
        book.Title = dto.title;
        book.Genre = dto.genre != null ? ctx.Genres.First(g => g.Id == dto.genre) : null;

        book.Authors.Clear();
        dto.authors.ForEach(id => book.Authors.Add(ctx.Authors.First(a => a.Id == id)));

        await ctx.SaveChangesAsync();
        return new BookDTO(book);
    }

    public async Task<BookDTO> DeleteBook(string bookId)
    {
        var book = ctx.Books.First(b => b.Id == bookId);
        ctx.Books.Remove(book);
        await ctx.SaveChangesAsync();
        return new BookDTO(book);
    }

    public async Task<AuthorDTO> CreateAuthor(CreateAuthorRequestDto dto)
    {
        Validator.ValidateObject(dto, new ValidationContext(dto), true);

        var author = new Author
        {
            Id = Guid.NewGuid().ToString(),
            Createdat = DateTime.UtcNow,
            Name = dto.Name
        };
        ctx.Authors.Add(author);
        await ctx.SaveChangesAsync();
        return new AuthorDTO(author);
    }

    public async Task<AuthorDTO> UpdateAuthor(UpdateAuthorRequestDto dto)
    {
        Validator.ValidateObject(dto, new ValidationContext(dto), true);
        var author = ctx.Authors.First(a => a.Id == dto.Id);
        await ctx.Entry(author).Collection(e => e.Books).LoadAsync();
        author.Books.Clear();
        author.Name = dto.Name;
        await ctx.SaveChangesAsync();
        return new AuthorDTO(author);
    }

    public async Task<AuthorDTO> DeleteAuthor(string authorId)
    {
        var author = ctx.Authors.First(a => a.Id == authorId);
        ctx.Authors.Remove(author);
        await ctx.SaveChangesAsync();
        return new AuthorDTO(author);
    }

    public async Task<GenreDTO> CreateGenre(CreateGenreDTORequest dto)
    {
        Validator.ValidateObject(dto, new ValidationContext(dto), true);

        var genre = new Genre
        {
            Id = Guid.NewGuid().ToString(),
            Createdat = DateTime.UtcNow,
            Name = dto.Name
        };
        ctx.Genres.Add(genre);
        await ctx.SaveChangesAsync();
        return new GenreDTO(genre);
    }

    public async Task<GenreDTO> DeleteGenre(string genreId)
    {
        var genre = ctx.Genres.First(a => a.Id == genreId);
        ctx.Genres.Remove(genre);
        await ctx.SaveChangesAsync();
        return new GenreDTO(genre);
    }

    public async Task<GenreDTO> UpdateGenre(UpdateGenreDTORequest dto)
    {
        Validator.ValidateObject(dto, new ValidationContext(dto), true);

        var genre = ctx.Genres.First(g => g.Id == dto.id);
        genre.Name = dto.name;
        await ctx.SaveChangesAsync();
        return new GenreDTO(genre);
    }

    public async Task<List<AuthorDTO>> GetAuthorDtos()
    {
        return await ctx.Authors
            .Include(a => a.Books)
            .ThenInclude(b => b.Genre)
            .Select(a => new AuthorDTO(a))
            .ToListAsync();
    }
}