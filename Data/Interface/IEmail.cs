namespace MyProject_PMS_.Data.Interface
{
   public interface IEmail
   {
       Task SendEmailAsync(string toEmail, string subject, string message);
   }
}
