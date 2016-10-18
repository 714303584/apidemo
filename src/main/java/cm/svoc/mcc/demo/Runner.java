package cm.svoc.mcc.demo;

import io.vertx.core.Vertx;
import io.vertx.core.http.HttpServer;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.handler.StaticHandler;

public class Runner {
	public static void main(String[] args) {
		
		Vertx vertx = Vertx.vertx();
		HttpServer httpServer = vertx.createHttpServer();
		Router router = Router.router(vertx);

		router.route().handler(context -> {
//			context.response().putHeader("Access-Control-Allow-Origin", "http://localhost:8080");
//			context.response().putHeader("Access-Control-Allow-Headers", "GET,POST,DELETE,PATCH");
			context.next();
		});
		router.route("/*").handler(StaticHandler.create().setCachingEnabled(false));		
		
		
		httpServer.requestHandler(router::accept).listen(19999);
		
		
		
		
		
		
		
		
	}

}
