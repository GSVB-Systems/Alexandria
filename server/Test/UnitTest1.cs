using System.ComponentModel.DataAnnotations;
using api.DTOs.Requests.Author;
using api.DTOs.Requests.Book;
using api.Service;
using Microsoft.EntityFrameworkCore;
using scaffold;

namespace Test;

public class UnitTest1
{
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
