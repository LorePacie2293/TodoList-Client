package utils;

import java.sql.Connection;
import javax.servlet.ServletRequest;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import bean.UserAccount;

//Contiene metodi per la memorizazzione dell'utente loggato(Session e Coockie)
public class MyUtils {
	
	//Attributo usato per fare riferimento allutente loggato
	public static final String ATT_CONNECTION = "NameConnection";
	
	//Gestione session
	//Assegna come attributo alla richiesta http il valore della connessione al database
	public static void storeRequestConnection(ServletRequest request, Connection conn) {
		request.setAttribute(ATT_CONNECTION, conn);
	}
	
	//Recupera la connessione al database dalla richiesta http
	public static Connection getRequestConnection(ServletRequest request) {
		Connection conn = (Connection) request.getAttribute(ATT_CONNECTION);
		return conn;
	}
	
	//memorizza un utente loggato nella sessione http
	public static void storeLogineduser(HttpSession session, UserAccount logUser) {
		session.setAttribute(ATT_CONNECTION, logUser);
	}
	
	//recupera un utente loggato, quindi gia inserito nella sessione
	public static UserAccount getStoreLoginUser(HttpSession session) {
		UserAccount user = (UserAccount) session.getAttribute(ATT_CONNECTION);
		return user;
	}
	
	//Gestione Cookie
	//Creazione cookie con il nome dell'utente loggato
	public static void storeCookieLogingUser(HttpServletResponse response, UserAccount user) {
		Cookie cookie = new Cookie(ATT_CONNECTION, user.getUserName());
		cookie.setMaxAge(24 * 60 * 60);
		response.addCookie(cookie);
	}
	
	//Controlla i cookie e restituisce quello che contiene il nome dell'utente loggato
	public static String getCookieLoginUser(HttpServletRequest request) {
		Cookie[] listCookie = request.getCookies();
		
		for(Cookie c : listCookie) {
			if(c.getName().equals(ATT_CONNECTION)) {
				return c.getValue();
			}
		}
		return null;
	}
	
	//Elimina il coockie con l'utente loggato
	public static void deleteCoikieLoginUser(HttpServletResponse response) {
		
		//Crea un cookie nullo con il nome dell'utente loggato 
		Cookie cookie = new Cookie(ATT_CONNECTION, null);
		
		//Elimina il cookie
		cookie.setMaxAge(0);
		
		//Inserisci nella ripsosta il cookie con il valore dell'utente loggato e poi eliminato
		response.addCookie(cookie);
		
	}
}
