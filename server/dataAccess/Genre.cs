using System;
using System.Collections.Generic;

namespace scaffold;

public interface IGenre
{
    string Id { get; set; }
    string Name { get; set; }
    DateTime? Createdat { get; set; }
    ICollection<Book> Books { get; set; }
    ICollection<Author> Authors { get; set; }
    ICollection<Book> BooksNavigation { get; set; }
}

public partial class Genre : IGenre
{
    public string Id { get; set; } = null!;

    public string Name { get; set; } = null!;

    public DateTime? Createdat { get; set; }

    public virtual ICollection<Book> Books { get; set; } = new List<Book>();

    public virtual ICollection<Author> Authors { get; set; } = new List<Author>();

    public virtual ICollection<Book> BooksNavigation { get; set; } = new List<Book>();
}
