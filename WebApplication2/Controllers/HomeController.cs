using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApplication2.Models;

namespace WebApplication2.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            if(Session["fav_items"] == null)
            {
                Session["fav_items"] = new List<GitItemModel>();
            }
            return View();
        }
        //Loads the favourites page, if no favourites were selected Session["fav_items"] would be null.
        public ActionResult Favorites()
        {
            if(Session["fav_items"] == null)
            {
                Session["fav_items"] = new List<GitItemModel>();
            }
            return View(Session["fav_items"]);
        }

        //When save faourite is called, it lands in this controller, saving the favourite item into the session
        [HttpPost]
        public JsonResult SaveFavourite(GitItemModel item)
        {
            List<GitItemModel> list = (List<GitItemModel>)Session["fav_items"];
            //check if this item was already added by ID
            foreach(GitItemModel _item in list)
            {
                if(_item.id == item.id)
                {
                    return Json("error");
                }
            }
            //
            list.Add(item);
            Session["fav_items"] = list;
            return Json("success");
        }
    }
}