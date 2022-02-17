-- Multi-Table Query Practice

-- Display the ProductName and CategoryName for all products in the database. Shows 77 records.
SELECT ProductName, CategoryName FROM products as p
    JOIN Categories as c on p.CategoryID = c.CategoryID;


-- Display the order Id and shipper CompanyName for all orders placed before August 9 2012. Shows 429 records.
SELECT OrderID, ShipperName FROM Orders as o
    JOIN Shippers as s on s.ShipperID = o.ShipperID
    WHERE OrderDate > 2012-08-09;


-- Display the name and quantity of the products ordered in order with Id 10251. Sort by ProductName. Shows 3 records.
SELECT ProductName, Quantity FROM OrderDetails as od
    JOIN Products as p ON od.ProductID = p.ProductID
    WHERE OrderID = 10251;


-- Display the OrderID, Customer's Company Name and the employee's LastName for every order. All columns should be labeled clearly. Displays 16,789 records.
SELECT OrderID, CustomerName, LastName FROM Orders AS o
    LEFT JOIN Customers AS c ON c.CustomerID = o.CustomerID,
    Employees AS e ON e.EmployeeID = o.EmployeeID;