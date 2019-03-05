import { apolloClient } from '@/apollo.js';
import gql from 'graphql-tag';
import { updateUser } from "@/utils/auth.util.js";

export const dataManip = (usersData) => {
    return usersData.map(u => ({ ...u, containers: u.containers.length}));
};
  //Delete Button Function--------------------------------------------------------->
export const warning = (index, data) => {
    this.$confirm('This will permanently delete this user. Continue?', 'Warning', {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type:'warning'
    }).then(() => {
      this.$message({
        type: 'success',
        message: 'Delete Completed'
      });
      this.deleteUser(index, data);
    }).catch(() => {
      this.$message({
        type: 'info',
        message: 'Delete Canceled'
      })
    })
}
  //Called in warning.
export const deleteUser = (index, data) => {
    data[index].userid
    return apolloClient.mutate({
      mutation: gql`
    mutation{
      deleteUser(userid: "${data[index].userid}"){
        userid
        }
      }`})
    }
  //Edit Button Function--------------------------------------------------------->
export const edit = (index, data, form, currentIndex) => {
    this.dialogFormVisible = true;
    form.userid = data[index].userid;
    form.name = data[index].name;
    form.type = data[index].scope;
    this.currentIndex = index;
    }
  //Called in edit.
export const update = (currentIndex, data, form, updatedUser) => {
    updatedUser.name = form.name;
    updatedUser.scope = form.type;
    updatedUser.password = form.pass;
    const updatedUserId = data[currentIndex].userid;
    try{
      updateUser(updatedUserId, updatedUser)
      this.dialogFormVisible = false;
      this.$message({
        type: 'success',
        message: 'Update Completed'
    });
    }catch(err){
      this.$message({
        type: 'danger',
        message: err
      });
    }
  }
  //Selector Function------------------------------------------------------------>
export const toggleSelection = (rows) => {
    if (rows) {
      rows.forEach(row => {
        this.$refs.adminTable.toggleRowSelection(row);
      });
    } else {
      this.$refs.adminTable.clearSelection();
    }
  }
export const handleSelectionChange = (val) => {
    this.multipleSelection = val;
  }
  //Filtering Scope-------------------------------------------------------------->
export const filterScope = (value, row) => {
    return row.scope.includes(value);
}
export const filterHandler = (value, row, column) => {
    const property = column['property'];
    return row[property] === value;
  }