import ManageExtraSheets from "../views/auth/dashboard/Extra";
import Faqs from "../views/auth/dashboard/Faqs";
import GeneralToys from "../views/auth/dashboard/GeneralToys";
import Bundles from "../views/auth/dashboard/Bundles";
import Reviews from "../views/auth/dashboard/Reviews";
import Toys from "../views/auth/dashboard/Toys";
import Users from "../views/auth/dashboard/Users";
import ManageActivitySheets from "../views/auth/dashboard/activitySheets";
import Blogs from "../views/auth/dashboard/blogs";
import UpdateBlog from "../views/auth/dashboard/blogs/updateblog";
import CreatePost from "../views/auth/dashboard/createpost";
import ManageColoringSheets from "../views/auth/dashboard/manageColoringSheets";
import Orders from "../views/auth/dashboard/orders";
import EditPost from "../views/auth/dashboard/createpost/editpost";
import EditActivitySheet from "../views/auth/dashboard/activitySheets/editActivitySheet";
import EditColoringSheet from "../views/auth/dashboard/manageColoringSheets/editColoringSheet";
import EditExtra from "../views/auth/dashboard/Extra/editExtra";
import EditToys from "../views/auth/dashboard/Toys/editToys";
import EditGeneralToys from "../views/auth/dashboard/GeneralToys/editGeneralToys";
import EditBundle from "../views/auth/dashboard/Bundles/editBundle";

const Adminroutes = [
  {

    path: "users",
    component: <Users />
  },
  {

    path: "/admin/update-blog",
    component: <UpdateBlog />
  },
  {

    path: "create-post",
    component: <CreatePost />
  },
  {

    path: "/admin/update-post/:id",
    component: <EditPost />
  },
  {

    path: "/admin/edit-activitysheet/:id",
    component: <EditActivitySheet />
  },
  {

    path: "/admin/edit-coloringsheet/:id",
    component: <EditColoringSheet />
  },
  {

    path: "/admin/edit-extrasheet/:id",
    component: <EditExtra />
  },
  {

    path: "/admin/edit-toys/:id",
    component: <EditToys />
  },
  {

    path: "/admin/edit-generaltoys/:id",
    component: <EditGeneralToys />
  },
  {

    path: "/admin/edit-bundle/:id",
    component: <EditBundle />
  },
  {
    path: "coloring-sheets",
    component: <ManageColoringSheets />
  },
  {
    path: "activity-sheets",
    component: <ManageActivitySheets />
  },
  {
    path: "toys",
    component: <Toys />
  },
  {
    path: "general-toys",
    component: <GeneralToys />
  },
  {
    path: "bundles",
    component: <Bundles />
  },
  {
    path: "extra-sheets",
    component: <ManageExtraSheets />
  },
  {
    path: "blogs",
    component: <Blogs />
  },
  {
    path: "orders",
    component: <Orders />
  },
  {
    path: "faqs",
    component: <Faqs />
  },
  {
    path: "reviews",
    component: <Reviews />
  },
]

export default Adminroutes;