package controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import DAO.TodoDAO;
import bean.Todo;


//Servizio che restituisce la lista dei todo dal db e ne aggiunge altri
public class HomeServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	private Gson gson = new Gson();
	
	//Restituisce un json contenente la lista dei todo nel db
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		List<Todo> todoList = null;
		try {
			todoList = TodoDAO.ReadTodoList();
		} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}
		
		//Conversione in json string da oggetto
		String jsonString = this.gson.toJson(todoList);
		
		PrintWriter out = response.getWriter();
		response.setContentType("application/json");
		out.print(jsonString);
		out.flush();
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		doGet(request, response);
	}

}
