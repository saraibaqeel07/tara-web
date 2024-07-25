import ManageExtraSheets from "../views/auth/dashboard/Extra";
import Faqs from "../views/auth/dashboard/Faqs";
import Reviews from "../views/auth/dashboard/Reviews";
import Users from "../views/auth/dashboard/Users";
import ManageActivitySheets from "../views/auth/dashboard/activitySheets";
import CreatePost from "../views/auth/dashboard/createpost";
import ManageColoringSheets from "../views/auth/dashboard/manageColoringSheets";
import Orders from "../views/auth/dashboard/orders";

const Adminroutes = [
  {

    path: "users",
    component: <Users />
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
    path: "extra-sheets",
    component: <ManageExtraSheets />
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