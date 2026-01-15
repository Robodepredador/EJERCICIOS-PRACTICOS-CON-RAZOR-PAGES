using System.Diagnostics;
using System.Reflection.Metadata;
using Microsoft.AspNetCore.Mvc;
using WebSystemExample.Models;

namespace WebSystemExample.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        public IActionResult Ejercicio1()
        {
            return View();
        }

        public IActionResult Ejercicio2()
        {
            return View();
        }

        public IActionResult Ejercicio3()
        {
            return View();
        }

        public IActionResult Ejercicio4()
        {
            return View();
        }

        public IActionResult Ejercicio5()
        {
            return View();
        }

        public IActionResult Ejercicio6()
        {
            return View();
        }   

        public IActionResult Ejercicio7()
        {
            return View();
        }

        public IActionResult Ejercicio8()
        {
            return View();
        }

        public IActionResult Ejercicio9()
        {
            return View();
        }

        public IActionResult Ejercicio10()
        {
            return View();
        }

        public IActionResult Ejercicio11()
        {
            return View();
        }

        public IActionResult Ejercicio12()
        {
            return View();
        }

        public IActionResult Ejercicio13()
        {
            return View();
        }

        public IActionResult Ejercicio14()
        {
            return View();
        }

        public IActionResult Ejercicio15()
        {
            return View();
        }

        public IActionResult Ejercicio16()
        {
            return View();
        }

        public IActionResult Ejercicio17()
        {
            return View();
        }

        public IActionResult Ejercicio18()
        {
            return View();
        }

        public IActionResult Ejercicio19()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
