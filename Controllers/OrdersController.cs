using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
// using MimeKit;
using MyProject_PMS_.Data.DTO;
using MyProject_PMS_.Data.Interface;
using MyProject_PMS_.Data.Models;
// using MyProject_PMS_Data.Interface;
// using MailKit.Net.Smtp;
using System.Security.Claims;
// using MyProject_PMS_.Interface;

namespace MyProject_PMS_.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly IOrder iorder;
        private readonly IDrug idrug;
        private readonly IConfiguration _configuration;
       private readonly IEmail email;
        private readonly IUser user;

        public OrdersController(IOrder _iorder, IDrug _idrug,IConfiguration configuration, IUser user,IEmail email)//,IEmail email,IUser user)
        {
            iorder = _iorder;
            idrug = _idrug;
            _configuration = configuration;
            this.email = email;
            this.user = user;
        }

        [HttpGet]
       [Authorize(Policy = "RequireAdminRole")]
        public async Task<IActionResult> GetAllOrders()
        {
            var orders = await iorder.GetAllOrdersAsync();
            var orderDtos = orders.Select(o => new OrderDto
            {
                OrderId = o.OrderId,
                UserId = o.UserId,
                OrderDate = o.OrderDate,
                Status = o.Status,
                TotalAmount = o.TotalAmount,
                OrderItems = o.OrderItems.Select(oi => new OrderItemDto
                {
                    OrderItemId = oi.OrderItemId,
                    DrugId = oi.DrugId,
                    DrugName = oi.Drug.Name,
                    Quantity = oi.Quantity,
                    Price = oi.Price,
                    TotalAmount = oi.Price * oi.Quantity  
                }).ToList()
            });

            

            return Ok(orderDtos);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetOrderById(int id)
        {
            var order = await iorder.GetOrderByIdAsync(id);
            if (order == null)
            {
                return NotFound();
            }
            //  userRole = User.FindFirst(ClaimTypes.Role).Value;
            var userIdClaim = int.Parse(User.FindFirst(ClaimTypes.Sid)?.Value);
            var userRoleClaim = User.FindFirst(ClaimTypes.Role)?.Value;

            if(order.UserId != userIdClaim && userRoleClaim == "Doctor"){// && userIdClaim != 1){
                return BadRequest();
            }


            var orderDto = new OrderDto
            {
                OrderId = order.OrderId,
                UserId = order.UserId,
                OrderDate = order.OrderDate,
                Status = order.Status,
                TotalAmount = order.TotalAmount,
                OrderItems = order.OrderItems.Select(oi => new OrderItemDto
                {
                    OrderItemId = oi.OrderItemId,
                    DrugId = oi.DrugId,
                    DrugName = oi.Drug.Name,
                    Quantity = oi.Quantity,
                    Price = oi.Price,
                    TotalAmount = oi.Price*oi.Quantity  // oi.TotalAmount*
                }).ToList()
            };



            return Ok(orderDto);
        }

        [HttpGet("userId")]
        public async Task<IActionResult> GetOrderByUserId()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.Sid)?.Value;
            if (userIdClaim == null)
            {
                return Unauthorized("User is not logged in.");
            }

            if (!int.TryParse(userIdClaim, out int userId))
            {
                return BadRequest("Invalid user ID.");
            }

            var orders = await iorder.GetOrdersByUserIdAsync(userId);

            var orderDtos = orders.Select(o => new OrderDto
            {
                OrderId = o.OrderId,
                UserId = o.UserId,
                OrderDate = o.OrderDate,
                Status = o.Status,
                TotalAmount = o.TotalAmount,
                OrderItems = o.OrderItems.Select(oi => new OrderItemDto
                {
                    OrderItemId = oi.OrderItemId,
                    DrugId = oi.DrugId,
                    DrugName = oi.Drug.Name,
                    Quantity = oi.Quantity,
                    Price = oi.Price,
                    TotalAmount = oi.Price * oi.Quantity//oi.TotalAmount
                }).ToList()
            });

            return Ok(orderDtos);
        }

        //===========================

        [HttpPost]
        public async Task<IActionResult> AddOrder(NewOrderDto orderDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var userIdClaim = int.Parse(User.FindFirst(ClaimTypes.Sid).Value);
                var order = new Order
                {
                    UserId = userIdClaim,
                    OrderDate = DateTime.UtcNow,
                    OrderItems = new List<OrderItem>()
                };

                foreach (var i in orderDto.OrderDetails)
                {
                    var drug = await idrug.GetDrugByIdAsync(i.DrugId);
                    if (drug == null)
                    {
                        ModelState.AddModelError("", $"Drug with ID {i.DrugId} not found");
                        return BadRequest(ModelState);
                    }

                    if (drug.Quantity < i.quantity)
                    {
                        return BadRequest($"Insufficient stock for drug {drug.Name}. Required: {i.quantity}, Available: {drug.Quantity}.");
                    }

                    if (drug.ExpiryDate < DateTime.Now)
                    {
                        return BadRequest($"Drug {drug.Name} has expired.");
                    }

                    var orderItem = new OrderItem
                    {
                        DrugId = i.DrugId,
                        Quantity = i.quantity,
                        Price = drug.Price,
                        TotalAmount = i.quantity * drug.Price
                    };
                    order.OrderItems.Add(orderItem);

                    // Deduct the quantity from the drug stock
                    drug.Quantity -= i.quantity;
                    await idrug.UpdateDrugAsync(drug);
                }

                await iorder.AddOrderAsync(order);
                return CreatedAtAction(nameof(GetOrderById), new { id = order.OrderId }, order);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        //============================

        [HttpPut("{id}")]
       // [Authorize(Policy = "RequireAdminRole")]
        public async Task<IActionResult> UpdateOrder(int id,  OrderDto orderDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            var order = await iorder.GetOrderByIdAsync(id);
            if (order == null)
            {
                return NotFound();
            }

            order.UserId = orderDto.UserId;
            order.OrderDate = orderDto.OrderDate;
            order.Status = orderDto.Status;
            order.OrderItems = orderDto.OrderItems.Select(oi => new OrderItem
            {
                OrderItemId = oi.OrderItemId,
                DrugId = oi.DrugId,
                Quantity = oi.Quantity,
                Price = oi.Price,
                TotalAmount = oi.TotalAmount
            }).ToList();

            await iorder.UpdateOrderAsync(order);
            return Ok(new { message = "Order updated successfully" });
        }

        [HttpDelete("{id}")]
       // [Authorize(Policy = "RequireAdminRole")]
        public async Task<IActionResult> DeleteOrder(int id)
        {

            await iorder.DeleteOrderAsync(id);
            return Ok(new { message = "Order deleted successfully" });
        }


        [HttpPost("{id}/validate")]
        [Authorize(Policy = "RequireAdminRole")]
        public async Task<IActionResult> ValidateOrder(int id)
        {
            var order = await iorder.GetOrderByIdAsync(id);
            if (order == null)
            {
                return NotFound(new { message = "Order not found." });
            }

            foreach (var i in order.OrderItems)
            {
                var drug = await idrug.GetDrugByIdAsync(i.DrugId);
                if (drug == null)
                {
                    return BadRequest($"Drug with ID {i.DrugId} not found.");
                }
            }

            order.Status = "PickedUp";
            await iorder.UpdateOrderAsync(order);

            //================
            var u = await user.GetUserByIdAsync(order.UserId);

            // var subject = "Order Update";
            // var body = $"<h1> Your order wtih orderId {order.OrderId} is PickedUp, {u.Name}!</h1><p>Thank you for Ordering from MedMart!.</p>";
            // await SendEmailAsync(this, u.Email, subject, body);
            var subject = "Your MedMart Order is On Its Way!";
            var body = $"<h1 style=\"color:#2E86C1;\">Good news, {u.Name}!</h1>" +
           $"<p>Your order with Order ID <strong>{order.OrderId}</strong> has been successfully picked up and is on its way to you.</p>" +
           "<p>Here are the details of your order:</p>" +
           "<table style=\"width: 100%; border-collapse: collapse;\">" +
           "<thead>" +
           "<tr style=\"background-color: #f2f2f2;\">" +
           "<th style=\"padding: 8px; border: 1px solid #ddd;\">Drug Name</th>" +
           "<th style=\"padding: 8px; border: 1px solid #ddd;\">Quantity</th>" +
           "<th style=\"padding: 8px; border: 1px solid #ddd;\">Price</th>" +
           "</tr>" +
           "</thead>" +
           "<tbody>";

            foreach (var item in order.OrderItems)
            {
                body += $"<tr>" +
                        $"<td style=\"padding: 8px; border: 1px solid #ddd;\">{item.Drug.Name}</td>" +
                        $"<td style=\"padding: 8px; border: 1px solid #ddd; text-align: center;\">{item.Quantity}</td>" +
                        $"<td style=\"padding: 8px; border: 1px solid #ddd; text-align: right;\">₹{item.Price:F2}</td>" +
                        $"</tr>";
            }

            body += "</tbody>" +
                    "</table>" +
                    $"<p style=\"font-size: 1.1em;\">Total Amount: <strong>₹{order.TotalAmount :F2}</strong></p>" +
                    "<p>We’re committed to ensuring that your order arrives quickly and safely.</p>" +
                    "<p>If you have any questions or need further assistance, feel free to reach out to our support team. We're here to help!</p>" +
                    "<p style=\"font-size: 1.1em;\">Thank you for choosing MedMart. We hope to serve you again soon!</p>" +
                    "<p style=\"font-size: 1.2em; color: #2E86C1;\"><strong>Best Regards,</strong><br>" +
                    "<strong>The MedMart Team</strong></p>";

            // await SendEmailAsync(this, u.Email, subject, body);
            await email.SendEmailAsync(u.Email, subject, body);


            //================
            return Ok(new { message = "Order validated and status updated to PickedUp" });


            // async Task SendEmailAsync(OrdersController @this, string to, string subject, string body)
            // {
            //     var message = new MimeMessage();
            //     message.From.Add(new MailboxAddress(@this._configuration["SmtpSettings:SenderName"], @this._configuration["SmtpSettings:SenderEmail"]));
            //     message.To.Add(new MailboxAddress(to, to));
            //     message.Subject = subject;
            //     message.Body = new TextPart("html")
            //     {
            //         Text = body
            //     };

            //     using (var client = new SmtpClient())
            //     {
            //         client.Connect(@this._configuration["SmtpSettings:Server"], int.Parse(@this._configuration["SmtpSettings:Port"]), false);
            //         client.Authenticate(@this._configuration["SmtpSettings:Username"], @this._configuration["SmtpSettings:Password"]);
            //         await client.SendAsync(message);
            //         client.Disconnect(true);
            //     }
            // }
        }


        [HttpGet("salesreport")]
       [Authorize(Policy = "RequireAdminRole")]
        public async Task<IActionResult> GetSalesReport(DateTime startDate, DateTime endDate)
        {
            var orders = await iorder.GetOrdersByDateRangeAsync(startDate, endDate);

            if (orders == null || !orders.Any())
            {
                return NotFound("No orders found in the specified date range.");
            }

            var totalSales = orders.Sum(o => o.TotalAmount);
            var totalOrders = orders.Count()-1;

            var salesReportItems = new List<SalesReportItemDto>();

            foreach (var group in orders.SelectMany(o => o.OrderItems).GroupBy(oi => oi.DrugId))
            {
                var drug = await idrug.GetDrugByIdAsync(group.Key);
                var salesReportItem = new SalesReportItemDto
                {
                    DrugId = group.Key,
                    DrugName = drug.Name,
                    TotalQuantitySold = group.Sum(oi => oi.Quantity),
                    TotalAmount = group.Sum(oi => oi.Quantity*oi.Price)
                };

                salesReportItems.Add(salesReportItem);
            }

            var salesReport = new SalesReportDto
            {
                StartDate = startDate,
                EndDate = endDate,
                TotalSales = totalSales,
                TotalOrders = totalOrders,
                SalesReportItems = salesReportItems
            };

            return Ok(salesReport);
        }

    }
}
