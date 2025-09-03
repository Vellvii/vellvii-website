import { supabase } from "@/integrations/supabase/client";

export class VivianChatService {
  static async getChatResponse(userMessage: string, pageContext: string): Promise<string> {
    try {
      console.log('Calling vivian-chat edge function with:', { userMessage, pageContext });
      
      const { data, error } = await supabase.functions.invoke('vivian-chat', {
        body: {
          messages: [
            { role: 'user', content: userMessage }
          ],
          temperature: 0.3,
          max_tokens: 600,
          sessionId: crypto.randomUUID()
        }
      });

      if (error) {
        console.error('Edge function error:', error);
        throw new Error(`Chat service error: ${error.message}`);
      }

      if (data?.error) {
        console.error('API error response:', data);
        throw new Error(`API error: ${data.error}`);
      }

      return data?.message || "I'm here to help you with any questions about our luxury collection.";
    } catch (error) {
      console.error('VivianChatService error:', error);
      throw error;
    }
  }

  static async getGreeting(pageContext: string): Promise<string> {
    return this.getChatResponse("Hello! I'd like to learn more about your products.", pageContext);
  }

  static async getProductRecommendation(pageContext: string): Promise<string> {
    return this.getChatResponse("Can you recommend something for me based on this page?", pageContext);
  }
}