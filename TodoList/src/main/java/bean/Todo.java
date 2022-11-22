package bean;

public class Todo {
	private String id;
	private String text;
	private boolean complete;
	
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public boolean isComplete() {
		return complete;
	}

	public void setComplete(boolean complete) {
		this.complete = complete;
	}

	public Todo(String id, String text, boolean complete) {
		super();
		this.id = id;
		this.text = text;
		this.complete = complete;
	}
}
