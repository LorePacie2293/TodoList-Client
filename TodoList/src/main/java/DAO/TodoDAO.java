package DAO;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import bean.Todo;

public class TodoDAO {

	//Restituisce la lista degli todo non ordinati
	public static List<Todo> ReadTodoList() throws SQLException, ClassNotFoundException{
		
		Class.forName("com.mysql.jdbc.Driver");
		Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/" + "todo_db", "admin", "Galadriel2293");
		
		List<Todo> listTodo = new ArrayList<Todo>();
		String sql = "select * from todo";
		PreparedStatement selectQuery = (PreparedStatement) conn.prepareStatement(sql);
		ResultSet resultQuery = selectQuery.executeQuery();
		Todo newTodo = null;

		//Scorri tutti i record
		while(resultQuery.next()) {
			String id = resultQuery.getString("id");
			String text = resultQuery.getString("text");
			boolean complete = resultQuery.getBoolean("complete");
			
			newTodo = new Todo(id, text, complete);
			listTodo.add(newTodo);
		}
		return listTodo;
	}
}
