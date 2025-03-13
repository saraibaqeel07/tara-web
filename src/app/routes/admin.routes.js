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