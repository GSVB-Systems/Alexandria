using System.ComponentModel.DataAnnotations;
using api.DTOs.Requests;
using api.DTOs.Requests.Author;
using api.DTOs.Requests.Book;
using api.Service;
using Microsoft.EntityFrameworkCore;
using scaffold;

namespace Test;

public class UnitTest1
{
    
    //Privat instans af DBcontext, så vi får en ren DB på de tests som benytter sig af contexten. 
    private MyDbContext GetInMemoryDbContext()
    {
        var options = new DbContextOptionsBuilder<MyDbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid()
                .ToString()) 
            .Options;

        return new MyDbContext(options);
        
    }

    [Fact]
    public void AuthorCreationTestNameRulesAreViolated()
    {
        var invalidDto = new CreateAuthorRequestDto
        {
            Name = "John123"

        };
        Assert.Throws<ValidationException>(() =>
            Validator.ValidateObject(invalidDto, new ValidationContext(invalidDto), true)
        );
    }



    public class BookDtoValidationTests
    {
        [Fact]
        public void CreateBookDTORequest_InvalidPagesAndTitle_ThrowsValidationException()
        {
            var invalidBook = new CreateBookDTORequest
            {
                Pages = 0,
                Title = ""
            };

            Assert.Throws<ValidationException>(() =>
                Validator.ValidateObject(invalidBook, new ValidationContext(invalidBook), true)
            );
        }
    }

//Tests for Genres

    [Fact]
    public async Task CreateAsync_ShouldAddGenreOnCreation()
    {
        //De her comments er for min egen skyld - her arrangere jeg min test ved at instantiere de elementer jeg skal bruge, hhv min DbContext, service og den query jeg gerne vil teste. 
        var context = GetInMemoryDbContext();
        var service = new GenreService(context);
        var testRequest = new CreateGenreDTORequest { Name = "Chickflick" };

        //her prøver jeg ovenstående query for validitet.
        var result = await service.CreateAsync(testRequest);
        
        //ja her asserter vi jo så. 
        Assert.Equal("Chickflick", result.Name);
        Assert.Single(context.Genres);
        
        //hint hint, first test passed. 
    }
    
    [Fact]
    public async Task GetAllGenresAsync_ShouldReturnTheEntireListOfGenres()
    {
        
        var context = GetInMemoryDbContext();
        context.Genres.Add(new Genre { Id = Guid.NewGuid().ToString(), Name = "Sports Documentary" });
        context.Genres.Add(new Genre { Id = Guid.NewGuid().ToString(), Name = "True Crime" });
        await context.SaveChangesAsync();
        
       
        var service = new GenreService(context);
        var result = await service.GetAllAsync();
        
        
        Assert.Equal(2, result.Count);
        Assert.Contains(result, g => g.Name == "Sports Documentary");
        Assert.Contains(result, g => g.Name == "True Crime");
    }

    [Fact]
    public async Task UpdateGenreAsync_ShouldUpdateGenreNameForChosenItem()
    {
        var context = GetInMemoryDbContext();
        var genre = new Genre { Id = Guid.NewGuid().ToString(), Name = "CHANGE MY NAME" };
        context.Genres.Add(genre);
        await context.SaveChangesAsync();

        var service = new GenreService(context);
        var request = new UpdateGenreDTORequest
        {
            id = genre.Id,
            name = "Yay i got a new name"
        };
        
        var result = await service.UpdateAsync(request);
        Assert.Equal("Yay i got a new name", result.Name);
        Assert.Equal("Yay i got a new name", context.Genres.First().Name);
    }

    
    [Fact]
    public async Task DeleteGenresAsync_ShouldRemoveChosenGenre()
    {
        var context = GetInMemoryDbContext();
        var genre = new Genre { Id = Guid.NewGuid().ToString()};
        context.Genres.Add(genre);
        await context.SaveChangesAsync();
        
        var service = new GenreService(context);
        var request = new DeleteGenreDTORequest { id = genre.Id };
        
        var result = await service.DeleteAsync(request);
        Assert.Equal("Tragic Comedy", result.Name);
        Assert.Empty(context.Genres);
    }
}

