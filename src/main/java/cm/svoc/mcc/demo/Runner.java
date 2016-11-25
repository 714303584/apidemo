package cm.svoc.mcc.demo;

import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


import io.vertx.core.Handler;
import io.vertx.core.Vertx;
import io.vertx.core.http.HttpServer;
import io.vertx.core.http.ServerWebSocket;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.handler.StaticHandler;

public class Runner {
	
	public static Map<String, ChatRoom> rooms = new HashMap<String, ChatRoom>();
	public static void main(String[] args) {
		
		Vertx vertx = Vertx.vertx();
		HttpServer httpServer = vertx.createHttpServer();
		Router router = Router.router(vertx);

		router.route().handler(context -> {
			context.next();
		});
		router.route("/*").handler(StaticHandler.create().setCachingEnabled(false));	
		
		
		httpServer.websocketHandler(new Handler<ServerWebSocket>(){
			@Override
			public void handle(ServerWebSocket ws) {
				String name = null;
				String path = ws.path();
				
				Pattern pattern =Pattern.compile("/websocket/(.*?)/(.*?)/");
				Matcher m = pattern.matcher(path);
				String room = null;
				
				 ChatRoom chatRoom = new ChatRoom();
				Actor actor = new Actor();
				if(m.matches()){
					String[] strs = path.split("/");
					room = strs[2];
					name = strs[3];
					
					ChatRoom exsitRoom = rooms.get(room);
					if(exsitRoom == null){
						chatRoom = new ChatRoom();
						chatRoom.setName(room);
						rooms.put(room, chatRoom);
					}
					
					 Actor exsit = chatRoom.getActors().get(name);
					
					if(exsit != null){
						JsonObject message = new JsonObject();
						message.put("name", name);
						message.put("message","名称已存在.");
						message.put("time", new Date().toString());
						ws.writeFinalTextFrame(message.toString());
						ws.close();
						return;
					}else{
						actor.setName(name);
						actor.setSws(ws);
						chatRoom.getActors().put(name, actor);
					}
					
				}else{
					ws.close();
					return;
				}
				
				ws.closeHandler(handler -> {
					System.out.println(""+ws.toString());
				});
				ws.handler(data -> {
						JsonObject message = new JsonObject();
						message.put("name", "广播");
						message.put("message", data.toString());
						message.put("time", new Date().toString());
					Iterator<ChatRoom> it = rooms.values().iterator();
					
					while (it.hasNext()) {
						ChatRoom cr =  it.next();
						Iterator<Actor> ait =  cr.getActors().values().iterator();
						
						while (ait.hasNext()) {
							Actor a =  ait.next();
							 a.getSws().writeFinalTextFrame(message.toString());
						}
					}
					
					System.out.println("message:"+message.toString());
				});
				
			}
			
		});
		
		httpServer.requestHandler(router::accept).listen(19999);
		
		
	}

}
