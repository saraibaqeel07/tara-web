import CreatePost from "../views/auth/dashboard/createpost";
import EditPost from "../views/auth/dashboard/editpost";

const Adminroutes = [
  {

    path: "create-post",
    component: <CreatePost />
  },
  {
    path: "edit-post",
    component: <EditPost />
  },
]

export default Adminroutes;