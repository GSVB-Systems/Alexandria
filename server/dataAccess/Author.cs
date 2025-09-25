using System;
using System.Collections.Generic;

namespace scaffold;

public interface IAuthor
{
    string Id { get; set; }
    string Name { get; set; }
    DateTime? Createdat { get; set; }
    ICollection<Book> Books { get; set; }
    ICollection<Genre> Genres { get; set; }
}

public partial class Author : IAuthor
{
    public string Id { get; set; } = null!;

    public string Name { get; set; } = null!;

    public DateTime? Createdat { get; set; }

    public virtual ICollection<Book> Books { get; set; } = new List<Book>();

    public virtual ICollection<Genre> Genres { get; set; } = new List<Genre>();
}
