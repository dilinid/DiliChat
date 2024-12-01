import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { HttpClient } from '@angular/common/http'; 

@Component({
  selector: 'app-chat',
  imports: [CommonModule, FormsModule, PickerModule], 
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']  
})
export class ChatComponent {
  chatWithUsername: string = 'Abhii'; // Name of the person you are chatting with
  newMessage: string = ''; // Bind this to the input field
  messages: { username: string; text: string; time: string; file?: File }[] = [
    { username: 'John', text: 'Hey!', time: '12:30 PM' },
    { username: 'You', text: 'Hi!', time: '12:31 PM' }
  ];
  showEmojiPicker: boolean = false; // Emoji picker toggle
  selectedFile: File | null = null;

  constructor(private http: HttpClient) {}

  toggleEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  addEmoji(event: any) {
    this.newMessage += event.emoji.native; // Add selected emoji to the message
  }

  // API call to send a message to the backend
  sendMessage() {
    if (this.newMessage.trim()) {
      const messageData = {
        username: 'You', // Replace with actual user
        text: this.newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) // Format time as HH:MM
      };

      // Send message to the backend
      this.http.post('http://your-backend-api/sendMessage', messageData)
        .subscribe((response: any) => {
          // Push the message to the chat if the response is successful
          this.messages.push(messageData);
          this.newMessage = ''; // Clear the input field
          this.showEmojiPicker = false; // Hide emoji picker after sending
        }, error => {
          console.error('Error sending message', error);
        });
    }
  }

  // Handle file input for sending files
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      const fileMessage = {
        username: 'You', // Replace with actual user
        text: `📎 ${this.selectedFile.name}`, // You can display the file name in the chat
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        file: this.selectedFile // Store the file for further processing if needed
      };

      // Send the file data to the backend (if required)
      this.http.post('http://your-backend-api/uploadFile', this.selectedFile)
        .subscribe(response => {
          // File uploaded successfully
          this.messages.push(fileMessage); // Add the file message to the chat
          this.selectedFile = null; // Reset file input
        }, error => {
          console.error('Error uploading file', error);
        });
    }
  }

  // Function to retrieve messages from the backend (optional)
  loadMessages() {
    this.http.get('http://your-backend-api/getMessages')
      .subscribe((response: any) => {
        // Assuming the response contains an array of messages
        this.messages = response.messages;
      }, error => {
        console.error('Error loading messages', error);
      });
  }

  ngOnInit() {
    this.loadMessages(); // Load messages when the component is initialized
  }
}
