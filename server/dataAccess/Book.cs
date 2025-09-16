using System;
using System.Collections.Generic;

namespace scaffold;

public interface IBook
{
    string Id { get; set; }
    string Title { get; set; }
    int Pages { get; set; }
    DateTime? Createdat { get; set; }
    string? Genreid { get; set; }
    Genre? Genre { get; set; }
    ICollection<Author> Authors { get; set; }
}

public partial class Book : IBook
{
    public string Id { get; set; } = null!;

    public string Title { get; set; } = null!;

    public int Pages { get; set; }

    public DateTime? Createdat { get; set; }

    public string? Genreid { get; set; }

    public virtual Genre? Genre { get; set; }

    public virtual ICollection<Author> Authors { get; set; } = new List<Author>();
}
