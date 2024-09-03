namespace MyProject_PMS_.Data.Models
{
    public class Supplier
    {
        public int SupplierId { get; set; }
        public string Name { get; set; }
        public string Contact { get; set; }
        public string Email { get; set; }

        public List<Drug> Drugs { get; set; }
    }
}
